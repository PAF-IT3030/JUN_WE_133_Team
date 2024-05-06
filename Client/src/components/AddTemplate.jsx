import React, { useState } from 'react';

const WorkoutPlanTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (id, name) => {
    setSelectedTemplate({ id, name });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div>
        <h2>Take your Template to plan your workouts</h2>
        
        <p>Select a template below to start customizing your workout plan:</p>{selectedTemplate && (
          <div>
            <p>You've selected: {selectedTemplate.name}</p>
          </div>
        )}
        <div>
          <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleTemplateSelect(1, 'Cardiovascular Training Template')}>
            <h3>Cardiovascular Training Template</h3>
            <p>A beginner-friendly full body workout plan.</p>
          </div>
          <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleTemplateSelect(2, 'High Intensity Interval Training (HIIT)')}>
            <h3>High Intensity Interval Training (HIIT)</h3>
            <p>A high intensity interval training workout plan.</p>
          </div>
          <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleTemplateSelect(3, 'Strength Training for Muscle Gain')}>
            <h3>Strength Training for Muscle Gain</h3>
            <p>A strength training workout plan focused on muscle gain.</p>
          </div>
          <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleTemplateSelect(4, 'Flexibility and Mobility Template')}>
            <h3>Flexibility and Mobility Template</h3>
            <p>Focuses on stretching and mobility exercises to improve flexibility and prevent injury.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default WorkoutPlanTemplates;
