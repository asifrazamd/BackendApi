const express = require("express");
const db = require('../config/db');

/**
 * Retrieve all properties from the database.
 * 
 * - Method: GET
 * - Endpoint: /properties
 * - Description: This function retrieves all properties in the `propertylist` table.
 * - Response: JSON array of property objects, each representing a property.
 */
const getAllProperties = async (req, res) => {
    try {
        const [response] = await db.execute('SELECT * FROM propertylist');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve properties", error });
    }
};

/**
 * Add a new property to the database.
 * 
 * - Method: POST
 * - Endpoint: /properties
 * - Description: Inserts a new property into the `propertylist` table.
 * - Request Body: { user_id, community_name, price, property_size, No_of_Bedrooms, No_of_Bathrooms }
 * - Response: Success message on successful insertion of the property.
 */
const AddProperty = async (req, res) => {
    const { user_id, community_name, price, property_size, No_of_Bedrooms, No_of_Bathrooms } = req.body;
    try {
        await db.execute(
            'INSERT INTO propertylist (user_id, community_name, price, property_size, No_of_Bedrooms, No_of_Bathrooms) VALUES (?, ?, ?, ?, ?, ?)', 
            [user_id, community_name, price, property_size, No_of_Bedrooms, No_of_Bathrooms]
        );
        res.status(200).json("Successfully Added Property");
    } catch (error) {
        res.status(500).json({ message: "Failed to add property", error });
    }
};

/**
 * Update an existing property in the database.
 * 
 * - Method: PUT
 * - Endpoint: /properties/:id
 * - Description: Updates a property's details in the `propertylist` table by ID.
 * - Parameters: `id` - ID of the property to update.
 * - Request Body: { user_id, community_name, price, property_size, No_of_Bedrooms, No_of_Bathrooms }
 * - Response: Success message on successful update, or error if the property does not exist.
 */
const UpdateProperty = async (req, res) => {
    const { id } = req.params;
    const { user_id, community_name, price, property_size, No_of_Bedrooms, No_of_Bathrooms } = req.body;

    try {
        // Check if property exists
        const [existingProperty] = await db.execute('SELECT * FROM propertylist WHERE id = ?', [id]);
        if (existingProperty.length === 0) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Update property
        const [response] = await db.execute(
            'UPDATE propertylist SET user_id = ?, community_name = ?, price = ?, property_size = ?, No_of_Bedrooms = ?, No_of_Bathrooms = ? WHERE id = ?', 
            [user_id, community_name, price, property_size, No_of_Bedrooms, No_of_Bathrooms, id]
        );

        if (response.affectedRows === 1) {
            res.status(200).json({ message: "Property updated successfully" });
        } else {
            res.status(500).json({ message: "Failed to update property" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating property", error });
    }
};

/**
 * Delete a property from the database.
 * 
 * - Method: DELETE
 * - Endpoint: /properties/:id
 * - Description: Deletes a property from the `propertylist` table by ID.
 * - Parameters: `id` - ID of the property to delete.
 * - Response: Success message on successful deletion, or error if the property does not exist.
 */
const DeleteProperty = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM propertylist WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Property not found" });
        }
        
        await db.execute('DELETE FROM propertylist WHERE id = ?', [id]);
        res.status(200).json("Property Deleted");
    } catch (error) {
        res.status(500).json({ message: "Error deleting property", error });
    }
};

module.exports = { getAllProperties, AddProperty, UpdateProperty, DeleteProperty };
