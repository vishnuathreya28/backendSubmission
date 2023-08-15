const { Character } = require('../models/models');
const puppeteer = require('puppeteer');
const ExcelJS  = require('exceljs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');


// Controller function to create a new character
async function createCharacter(req, res) {
  try {
    const { name, age, photos, gender, occupation } = req.body;

    // Validate request data
    if (!name || !age || !photos || !gender || !occupation) {
      return res.status(400).json({ message: 'All fields (name, age, photos, gender, occupation) are required.' });
    }

    // Create a new Character document
    const newCharacter = new Character({
      name,
      age,
      photos,
      gender,
      occupation,
    });

    // Save the new Character document to the database
    const savedCharacter = await newCharacter.save();

    // Respond with the saved Character document
    res.status(201).json(savedCharacter);
  } catch (error) {
    console.error('Error creating a new character:', error);
    res.status(500).json({ message: 'An error occurred while creating the character.' });
  }
}

// Controller function to get all characters
async function getCharacters(req, res) {
  try {
    const characters = await Character.find();
    console.log('Retrieved characters:', characters);
    res.json(characters);
  } catch (error) {
    console.error('Error getting characters:', error);
    res.status(500).json({ message: 'An error occurred while fetching characters.' });
  }
}

// Controller function to get a single character by ID
async function getCharacterById(req, res) {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found.' });
    }
    res.json(character);
  } catch (error) {
    console.error('Error getting character by ID:', error);
    res.status(500).json({ message: 'An error occurred while fetching the character.' });
  }
}

// Controller function to update a character by ID
async function updateCharacter(req, res) {
  try {
    const { name, age, photos, gender, occupation } = req.body;

    // Validate request data
    if (!name || !age || !photos || !gender || !occupation) {
      return res.status(400).json({ message: 'All fields (name, age, photos, gender, occupation) are required.' });
    }

    // Find the character by ID and update its properties
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        photos,
        gender,
        occupation,
      },
      { new: true }
    );

    if (!updatedCharacter) {
      return res.status(404).json({ message: 'Character not found.' });
    }

    // Respond with the updated character document
    res.json(updatedCharacter);
  } catch (error) {
    console.error('Error updating character by ID:', error);
    res.status(500).json({ message: 'An error occurred while updating the character.' });
  }
}

// Controller function to delete a character by ID
async function deleteCharacter(req, res) {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) {
      return res.status(404).json({ message: 'Character not found.' });
    }
    res.json({ message: 'Character deleted successfully.' });
  } catch (error) {
    console.error('Error deleting character by ID:', error);
    res.status(500).json({ message: 'An error occurred while deleting the character.' });
  }
}

// Function to generate PDF report using Puppeteer
// Function to generate PDF report using Puppeteer
async function generatePDFReport(req, res) {
  try {
    const characters = await Character.find();

    console.log('Characters fetched:', characters);

    const browser = await puppeteer.launch();
    console.log('Puppeteer launched');

    const page = await browser.newPage();
    console.log('New page created');

    const reportContent = `
      <h1>Character Report</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Relations</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          ${characters
            .map(
              (character) => `
                <tr>
                  <td>${character.name}</td>
                  <td>${character.age}</td>
                  <td>${character.gender}</td>
                  <td>${character.occupation}</td>
                  <td>${character.relations.join(', ')}</td>
                  <td>${character.photos.join(', ')}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    `;

    await page.setContent(reportContent);
    console.log('Report content set in page');

    const pdfBuffer = await page.pdf();
    console.log('PDF generated');

    await browser.close();
    console.log('Puppeteer browser closed');

    // Deliver the generated PDF report
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=character_report.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ message: 'An error occurred while generating the PDF report.' });
  }
}

// Function to generate Excel report using ExcelJS
async function generateExcelReport(req, res) {
  try {
    const characters = await Character.find();

    console.log('Characters fetched:', characters);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Character Report');
    console.log('Excel worksheet created');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Age', key: 'age', width: 10 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Occupation', key: 'occupation', width: 20 },
      { header: 'Relations', key: 'relations', width: 30 },
      { header: 'Photos', key: 'photos', width: 30 },
    ];

    characters.forEach((character) => {
      worksheet.addRow({
        name: character.name,
        age: character.age,
        gender: character.gender,
        occupation: character.occupation,
        relations: character.relations.join(', '),
        photos: character.photos.join(', '),
      });
    });
    console.log('Rows added to Excel worksheet');

    const excelBuffer = await workbook.xlsx.writeBuffer();
    console.log('Excel buffer generated');

    // Deliver the generated Excel report
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=character_report.xlsx');
    res.send(excelBuffer);
  } catch (error) {
    console.error('Error generating Excel report:', error);
    res.status(500).json({ message: 'An error occurred while generating the Excel report.' });
  }
}

// Function to generate CSV report using csv-writer
async function generateCSVReport(req, res) {
  try {
    const characters = await Character.find();

    const csvWriter = createCsvWriter({
      path: 'character_report.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'age', title: 'Age' },
        { id: 'gender', title: 'Gender' },
        { id: 'occupation', title: 'Occupation' },
        { id: 'relations', title: 'Relations' },
        { id: 'photos', title: 'Photos' },
      ],
    });

    const csvRecords = characters.map((character) => ({
      name: character.name,
      age: character.age,
      gender: character.gender,
      occupation: character.occupation,
      relations: character.relations.join(', '),
      photos: character.photos.join(', '),
    }));

    // Write records to the CSV file
    await csvWriter.writeRecords(csvRecords);

    // Read the generated CSV content
    const csvContent = fs.readFileSync('character_report.csv', 'utf8'); // Assuming 'fs' module is imported

    // Set the appropriate headers and send the CSV content in the response
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=character_report.csv');
    res.send(csvContent);
  } catch (error) {
    console.error('Error generating CSV report:', error);
    res.status(500).json({ message: 'An error occurred while generating the CSV report.' });
  }
}

module.exports = {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  generatePDFReport,
  generateExcelReport,
  generateCSVReport,
};


