# Kitchen Buddy API Documentation

This document provides a detailed API documentation for the **Mofa’s Kitchen Buddy** backend. The system allows users to manage their kitchen ingredients, save and retrieve recipes, and interact with a chatbot to get recipe suggestions based on their preferences.

## API Endpoints

---

### 1. **Route**: `/ingredients`

- **Method**: `POST`
- **Description**: Add a new ingredient to the user's inventory.
- **Sample Payload**:
  \`\`\`json
  {
  "name": "Egg",
  "quantity": "5 eggs",
  "category": "Dairy",
  "expiry_date": "2024-12-31"
  }
  \`\`\`
- **Sample Response**:
  \`\`\`json
  {
  "\_id": "60a7f7cda76fae60ec3f7f4e",
  "name": "Egg",
  "quantity": "5 eggs",
  "category": "Dairy",
  "expiry_date": "2024-12-31"
  }
  \`\`\`

---

### 2. **Route**: `/ingredients/:id`

- **Method**: `PUT`
- **Description**: Update an existing ingredient’s details (e.g., quantity or expiry date).
- **Sample Payload**:
  \`\`\`json
  {
  "quantity": "3 eggs",
  "expiry_date": "2024-12-30"
  }
  \`\`\`
- **Sample Response**:
  \`\`\`json
  {
  "\_id": "60a7f7cda76fae60ec3f7f4e",
  "name": "Egg",
  "quantity": "3 eggs",
  "category": "Dairy",
  "expiry_date": "2024-12-30"
  }
  \`\`\`

---

### 3. **Route**: `/recipes`

- **Method**: `POST`
- **Description**: Add a new recipe to the system.
- **Sample Payload**:
  \`\`\`json
  {
  "name": "Pancakes",
  "cuisine": "American",
  "ingredients": ["Egg", "Flour", "Milk", "Sugar"],
  "preparation_time": "10 minutes",
  "taste": "Sweet",
  "reviews": "4.5/5"
  }
  \`\`\`
- **Sample Response**:
  \`\`\`json
  {
  "\_id": "60a7f7cda76fae60ec3f7f4f",
  "name": "Pancakes",
  "cuisine": "American",
  "ingredients": ["Egg", "Flour", "Milk", "Sugar"],
  "preparation_time": "10 minutes",
  "taste": "Sweet",
  "reviews": "4.5/5"
  }
  \`\`\`

---

### 4. **Route**: `/suggest-recipe`

- **Method**: `POST`
- **Description**: Suggest recipes based on available ingredients.
- **Sample Payload**:
  \`\`\`json
  {
  "ingredients": ["Egg", "Flour", "Sugar"]
  }
  \`\`\`
- **Sample Response**:
  \`\`\`json
  [
  {
  "\_id": "60a7f7cda76fae60ec3f7f4f",
  "name": "Pancakes",
  "cuisine": "American",
  "ingredients": ["Egg", "Flour", "Sugar"],
  "preparation_time": "10 minutes",
  "taste": "Sweet",
  "reviews": "4.5/5"
  }
  ]
  \`\`\`

---

### 5. **Route**: `/chatbot`

- **Method**: `POST`
- **Description**: Interact with the chatbot to suggest recipes based on user preferences.
- **Sample Payload**:
  \`\`\`json
  {
  "user_message": "I want something sweet today"
  }
  \`\`\`
- **Sample Response**:
  \`\`\`json
  {
  "message": "How about making Pancakes? They're sweet and quick to prepare!"
  }
  \`\`\`

---

## Database Design

- **Ingredients Collection**:

  - `name`: String (ingredient name)
  - `quantity`: String (amount of ingredient available)
  - `category`: String (category like Dairy, Vegetables, etc.)
  - `expiry_date`: Date (expiry date of the ingredient)

- **Recipes Collection**:
  - `name`: String (recipe name)
  - `cuisine`: String (type of cuisine like Italian, American)
  - `ingredients`: Array of Strings (list of ingredients used in the recipe)
  - `preparation_time`: String (time taken to prepare the dish)
  - `taste`: String (taste description like Sweet, Spicy)
  - `reviews`: String (user rating)

---

## How to Run the Application

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/username/kitchen-buddy.git
   cd kitchen-buddy
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

4. The application will run on `http://localhost:3000`.

---

## Example Usage

### Add Ingredients

\`\`\`bash
curl -X POST http://localhost:3000/ingredients \
-H "Content-Type: application/json" \
-d '{"name": "Egg", "quantity": "5 eggs", "category": "Dairy", "expiry_date": "2024-12-31"}'
\`\`\`

### Suggest Recipe

\`\`\`bash
curl -X POST http://localhost:3000/suggest-recipe \
-H "Content-Type: application/json" \
-d '{"ingredients": ["Egg", "Flour", "Sugar"]}'
\`\`\`

---

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing ingredients and recipes
- **Mongoose**: MongoDB object modeling for Node.js
- **OpenAI GPT-3**: For integrating the chatbot functionality

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
