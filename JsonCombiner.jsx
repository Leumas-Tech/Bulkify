import React, { useState } from 'react';

const JsonCombiner = () => {
    const [combinedJson, setCombinedJson] = useState({});
    const [jsonText, setJsonText] = useState("");
    const [error, setError] = useState("");

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        let combinedData = {};

        const readFile = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        // First, we escape special characters and replace \n with actual new lines
                        const escapedJson = reader.result
                            .replace(/\n/g, '\\n')
                            .replace(/\r/g, '\\r')
                            .replace(/\t/g, '\\t');

                        // Then, we parse the escaped JSON
                        const json = JSON.parse(escapedJson);
                        resolve(json);
                    } catch (error) {
                        reject(`Error in file '${file.name}': ${error.message}`);
                    }
                };
                reader.onerror = () => reject(`Error reading file '${file.name}'`);
                reader.readAsText(file);
            });
        };

        const fileReadPromises = Array.from(files).map(readFile);

        try {
            const fileContents = await Promise.all(fileReadPromises);
            fileContents.forEach((content, index) => {
                combinedData[`id${index + 1}`] = content;
            });

            setCombinedJson(combinedData);
            setJsonText(JSON.stringify(combinedData, null, 2));
            setError(""); // Clear any previous error
        } catch (error) {
            console.error('Error reading files:', error);
            setError(`Error processing files: ${error.message}`); // Set the error state
        }
    };

    const downloadJson = () => {
        const blob = new Blob([jsonText], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = "combined.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='flex items-center justify-start w-full h-full'>

            <aside className='border-2 rounded-lg h-full  max-w-[300px] min-w-[20vw]'>
                <input type="file" multiple onChange={handleFileUpload} accept=".json" />

                {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            
                <button onClick={downloadJson}>Download Combined JSON</button>
            </aside>

            <div className='w-full h-full'>
                <nav className='w-full border-2 rounded-lg'>
                    This is the nav bar
                </nav>
                
                <textarea className='bg-transparent shadow-xl border-2 rounded-lg p-2 text-[10px] w-full h-full' value={jsonText} readOnly rows={10} />
            </div>

        </div>
    );
};

export default JsonCombiner;
