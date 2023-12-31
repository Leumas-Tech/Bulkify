# Bulkify
Just create a new Vite react projhect, preferabbly with tailwind css

Create a new node.js backend with npm init -y 

setup your frontend and backend as normal. drop the abckend code, and setup your endpoint 

in your frontend you might need an env to store your endpoint 


make sure to update the gpt function! 

once frontend and backend are setup you should be able to see the tool wherever you left it.
Just drop <Bulkify /> as a component in your vite react app. 



Best Prompt to USE: 

// based on our json skelton, please provide an explanation for each of the following exp: keys, reccomend us a valid subTopic related to out subject and question please explain why each exp is either right or wrong, and return only our updated JSON. for each of our options A.B.C and D include a key value for exp:, please give an explanation for why the correct answer is correct, but also why the false answers are wrong. For our subtopics please include a related topic based on our question and topic
// Please ensure that you will only reply with the json, and reupdate all necessary keys
//exp: provide an explanation for why that answer is right or wrong
//subtopic: provide a related topic based on the topic and question


copy and paste that into your textarea and you should be good to go. processing occurs 1 page at a time, after the page looks good, youll have to manually restart to the next file after you delete the current file you just worked on, this makes it easy to setup a queue, and redo actions where needed



