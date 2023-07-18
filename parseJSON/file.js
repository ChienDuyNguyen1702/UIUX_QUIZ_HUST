const fs = require("fs");

// Read the JSON file
fs.readFile("IT4441_old.json", "utf8", (err, data) => {
  // fs.readFile("test.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const json = JSON.parse(data);
    const answerObject = json[1].answers[0];
    const isCorrect = answerObject.isCorrect;
    const text = answerObject.text;
    // console.log(question); // Output: Định nghĩa tương tác người máy của ACM SIGCHI đề cập đến những yếu tố nào sau đây? (chọn 3)
    // console.log(isCorrect); // Output: true
    // console.log(text);
    // Transform the JSON structure
    const transformedJson = [];
    json.forEach((index) => {
      const question = index.question;
      const answerObject = index.answers[0];
      const text = answerObject.text;
      const newData = {
        question: question,
        answers: []
      };
      text.forEach((index)=>{
        newData.answers.push({isCorrect:true,"text":index});
      })
      // const text1 = answerObject.text[1];
      // if(text1==null) {text1=".";console.log(text1)}
      // const text2 = answerObject.text[2];
      // if(!text2) {text2=".";console.log(text2)}
      // console.log(question, text0, text1, text2)
      // console.log(question, text)
      console.log(newData)
      transformedJson.push(newData);
    });
    // const transformedJson = {
    //   question: json.question,
    //   // answerObject = json.answers[0],
    //   answers: Object.entries(json.answers)(([key, value]) => ({
    //     text: value,
    //     isCorrect: key === 'isCorrect' && value === true
    //   }))
    // };

    // Convert the transformed JSON back to string
    const updatedJson = JSON.stringify(transformedJson, null, 2);

    // Save the updated JSON back to the file
    fs.writeFile("IT4441_new.json", updatedJson, "utf8", (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        return;
      }
      console.log("JSON file updated successfully!");
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
