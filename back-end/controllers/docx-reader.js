exports.docxReader = (req, res, next) => {
  const textract = require("textract");

  const docxUrl = req.body.docxUrl; // url of file docx

  // config for textract module
  const config = {
    preserveLineBreaks: true,
    // preserveOnlyMultipleLineBreaks: true
  };

  // start to extract text in docx to text
  textract.fromUrl(docxUrl, config, function (error, text) {
    if (error) {
      // Cannot read file docx
      res.status(500).json({
        message: "Error to read file docx.",
      });
    } else {
      try {
        const text_list = text.split("\n\n").filter((m) => m !== ""); // split all readed text to quiz texts and remove some of empty quiz
        const quiz_list = []; // array of quiz to return json to client

        text_list.forEach((q) => {
          const quiz_split = q.split("\n"); // split lines of text to elements of array
          const len = quiz_split.length; // length of array of elements splited text

          const point_string = quiz_split[0];
          const question = quiz_split.slice(1, len - 4).join("\n"); // ['Trả lời câu hỏi sau:', '1+1=?'] => "Trả lời câu hỏi sau:\n1+1=?""
          // list of answers
          const answer_list = quiz_split.slice(len - 4, len); // get list answers
          
          const correct = answer_list.findIndex((ans) => ans.charAt(0) == "*"); // find index correct answer
          answer_list[correct] = answer_list[correct].substring(1, this.length); // remove '*' of correct answer in answer-list
          
          
          const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
          for(let answer in answer_list) {
            if(answer_list[answer].substring(0,3) ==  (labels[answer] + '. '))
              answer_list[answer] = answer_list[answer].substring(3, answer_list[answer].length);
          }
          // create quiz object
          const quiz = {
            point: point_string,
            question: question,
            answers: answer_list,
            correct: correct,
          };
          // push quiz to quiz-list
          quiz_list.push(quiz);
        });
        // return json to client
        res.status(200).json({
          message: "Read file successfully",
          quizList: quiz_list
        });
      } catch (error) {
        res.status(500).json({
          message: "Cannot read the file docx",
          quizList: []
        });
      }
    }
  });
};
