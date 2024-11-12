const express = require('express'); 
const router = express.Router();
const { getAllProperties, AddProperty, DeleteProperty, UpdateProperty } = require("../controllers/propertiesController.js");

/**
 * Route to retrieve all properties.
 * 
 * - Method: GET
 * - Endpoint: /properties
 * - Description: Calls the `getAllProperties` controller function to fetch and return all properties in the `propertylist` table.
 */
router.route("/properties").get(getAllProperties);

/**
 * Route to add a new property.
 * 
 * - Method: POST
 * - Endpoint: /properties
 * - Description: Calls the `AddProperty` controller function to insert a new property into the `propertylist` table.
 */
router.route("/properties").post(AddProperty);

/**
 * Route to update an existing property by ID.
 * 
 * - Method: PUT
 * - Endpoint: /properties/:id
 * - Description: Calls the `UpdateProperty` controller function to update an existing property in the `propertylist` table based on the provided ID.
 * - Parameters: 
 *   - `id` (URL parameter): The unique identifier of the property to update.
 */
router.route("/properties/:id").put(UpdateProperty);

/**
 * Route to delete a property by ID.
 * 
 * - Method: DELETE
 * - Endpoint: /properties/:id
 * - Description: Calls the `DeleteProperty` controller function to remove a property from the `propertylist` table based on the provided ID.
 * - Parameters: 
 *   - `id` (URL parameter): The unique identifier of the property to delete.
 */
router.route("/properties/:id").delete(DeleteProperty);

module.exports = router;
