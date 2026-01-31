import bcrypt from "bcrypt";

const hashPassword = async () => {
    const hash = await bcrypt.hash("123456", 10);
    console.log(hash);
};

hashPassword();