import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "Shukhrat",
      lastName: "Mamadaliev",
      email: "admin@gmail.com",
      phone: "+7754234324",
      gender: "Male",
      address: "24 Monthope road, E15LS",
      password: bcrypt.hashSync("1111", 8),
      isAdmin: true,
      isSeller: false,
    },
  ],
};

export default data;
