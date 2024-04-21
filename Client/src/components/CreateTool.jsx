import React, { useState } from 'react';

function CreateMealPlan() {
    const [mealName, setMealName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cookingInstructions, setCookingInstructions] = useState('');
    const [mealPhoto, setMealPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add code here to handle form submission, such as sending data to a server
        console.log("Meal Name:", mealName);
        console.log("Ingredients:", ingredients);
        console.log("Cooking Instructions:", cookingInstructions);
        console.log("Meal Photo:", mealPhoto);
    }

    return (
        <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
            <h1 style={{ marginBottom: "20px", color: "#333" }}>Create Meal Plan</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
                <label htmlFor="mealName" style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Meal Name:</label>
                <input 
                    type="text" 
                    id="mealName" 
                    name="mealName" 
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    style={{ width: "100%", padding: "10px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                    required 
                />

                <label htmlFor="ingredients" style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Ingredients:</label>
                <textarea 
                    id="ingredients" 
                    name="ingredients" 
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    rows="4" 
                    style={{ width: "100%", padding: "10px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                    required 
                />

                <label htmlFor="cookingInstructions" style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Cooking Instructions:</label>
                <textarea 
                    id="cookingInstructions" 
                    name="cookingInstructions" 
                    value={cookingInstructions}
                    onChange={(e) => setCookingInstructions(e.target.value)}
                    rows="4" 
                    style={{ width: "100%", padding: "10px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                    required 
                />

                <label htmlFor="mealPhoto" style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Photo of Prepared Meal:</label>
                <input 
                    type="file" 
                    id="mealPhoto" 
                    name="mealPhoto" 
                    accept="image/*"
                    onChange={(e) => setMealPhoto(e.target.files[0])}
                    style={{ marginBottom: "20px" }}
                />

                <button type="submit" style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Create Meal Plan</button>
            </form>
        </div>
    );
}

export default CreateMealPlan;
