// code away!
const server = require("./server");
const userRouter = require("./users/userRouter");
//const postRouter = require("./posts/postRouter");

server.use("/users", userRouter);
//server.use("/posts", postRouter);

server.listen(3333, () => {
    console.log("server up...");
  });