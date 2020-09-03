const server = require("./server");
const userRouter = require("./users/userRouter");
//const postRouter = require("./posts/postRouter");

server.use("/users", userRouter);
//server.use("/posts", postRouter);

const port = process.env.PORT || 3333;

server.listen(port, () => {
    console.log("server up...");
  });