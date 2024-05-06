import React, { useState } from 'react';

const WorkoutPlanTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const templates = [
    { id: 1, name: 'Beginner Full Body Workout', description: 'A beginner-friendly full body workout plan.' },
    { id: 2, name: 'High Intensity Interval Training (HIIT)', description: 'A high intensity interval training workout plan.' },
    { id: 3, name: 'Strength Training for Muscle Gain', description: 'A strength training workout plan focused on muscle gain.' }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div>
        <h2>Take your Template to plan your workouts</h2>
        
        <p>Select a template below to start customizing your workout plan:</p>
        <div>
          {templates.map(template => (
            <div key={template.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleTemplateSelect(template)}>
              <h3>{template.name}</h3>
              <p>{template.description}</p>
            </div>
          ))}
        </div>
        {selectedTemplate && (
          <div>
            <h3>Customize Your Selected Template</h3>
            <p>You've selected: {selectedTemplate.name}</p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default WorkoutPlanTemplates;
