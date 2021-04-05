import bcrypt from "bcryptjs";

const users = [
  {
    fullname: "Octyo Paswa Putra",
    role: "Programmer",
    username: "lucifer",
    password: bcrypt.hashSync("binary1010", 10),
    email: "octyo@example.com",
  },
  {
    fullname: "John Doe",
    role: "SQC",
    username: "john",
    password: bcrypt.hashSync("123456", 10),
    email: "john@example.com",
  },
  {
    fullname: "Jane Doe",
    role: "Support",
    username: "jane",
    password: bcrypt.hashSync("binary1010", 10),
    email: "jane@example.com",
  },
];

export default users;
