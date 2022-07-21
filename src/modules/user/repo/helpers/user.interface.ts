export default interface userInterface {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  sex: { male: "male"; female: "female" };
  photo: string;
  addresses: {
    street: string;
    city: string;
    country: string;
  }[];
  about: string;
  education: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: Date;
    to: Date;
  }[];
  experience: {
    company: string;
    position: string;
    from: Date;
    to: Date;
  }[];
  skills: {
    skill: string;
    level: string;
  }[];
  currentWork: {
    company: string;
    position: string;
    from: Date;
    to: Date;
  };
  resume: string;
  followedUsers: string[];
  followedCompanies: string[];
  followers: string[];
  role: string;
  isActive: boolean;
}
