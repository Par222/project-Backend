const chai = require("chai");
const testController = require("../services/utils");
describe("Add Doctor to the System", () => {
  describe("createDoctor()", () => {
    const doctor = {
      name: "Paras",
      des: "Heart Specialist",
      age: 29,
      expertise: "Cardiac",
      image: "www.google.com",
      fees: 1000,
      patients: [],
    };

    const Doclist = [];

    it("Should increase the length of the list", () => {
      let oldLength = Doclist.length;
      testController.createDoctor(Doclist, doctor);

      chai.expect(Doclist.length).to.equal(oldLength + 1);
    });
    it("Should have the lastest doctor at the end  of the list", () => {
      let latestDoc = doctor;
      testController.createDoctor(Doclist, doctor);

      chai.expect(Doclist[Doclist.length-2]).to.equal(latestDoc);
    });
  });
});
describe("Delete Doctor from the System", () => {
  describe("deleteDoctor(id)", () => {
    const id = "2";

    const Doclist = [
      {
        name: "Paras",
        des: "Heart Specialist",
        age: 29,
        expertise: "Cardiac",
        image: "www.google.com",
        fees: 1000,
        patients: [],
        id: "1",
      },
      {
        name: "Param",
        des: "Brain Specialist",
        age: 34,
        expertise: "Neurologist",
        image: "www.google.com",
        fees: 2000,
        patients: [],
        id: "2",
      },
    ];

    it("Should decrease the length of the list", () => {
      let oldLength = Doclist.length;
      testController.deleteDoctor(Doclist, id);

      chai.expect(Doclist.length).to.be.equal(oldLength - 1);
    });
    it("Should not have the removed doctor  in  the list", () => {
      testController.deleteDoctor(Doclist, id);

      chai.expect(Doclist[Doclist.findIndex((doc) => doc.id == id)]).to.be
        .undefined;
    });
  });
});

describe("Book Ambulance by Patient id", () => {
  describe("bookAmbByPatientId(id)", () => {
    const id = "2";
    const patient = "3";

    const Ambulance = [
      {
        status: "Free",
        plate: "MH-4067",
        driver: {
          name: "manish",
          image: "www.google.com",
          mobile: "8850834885",
        },
        id: "1",
        patient: "",
      },
      {
        status: "Free",
        plate: "MH-4897",
        driver: {
          name: "Danish",
          image: "www.google.com",
          mobile: "8850834885",
        },
        id: "2",
        patient: "",
      },
    ];

    it("The status of the ambulance should be allotted for the particular patient", () => {
      testController.getAmbByPatientId(Ambulance, id, patient);
      chai
        .expect(Ambulance[Ambulance.findIndex((amb) => amb.id == id)].status)
        .to.be.equal("Alloted");
    });
    it("The length of list remains the same", () => {
      oldLength = Ambulance.length;
      testController.getAmbByPatientId(Ambulance, id, patient);
      chai.expect(Ambulance.length).to.be.equal(oldLength);
    });
  });
});
describe("Deny A Appointment by Patient id", () => {
  describe("updateAppByPatientId(id)", () => {
    const  patient="2"
    const App = [
      {
        status: "Pending",
        illness: "Skin",
        mode: "Online",
        slot: {
          start_time: "8",
          date: "15 Nov 2022",
        },
        patient: "2",
        doctor: "3",
      },
    ];
    let status="Rejected"

    it("The Appointment status should be rejected for given patient", () => {
      testController.updateAppByPatientId(App,patient,status);
      chai.expect(App[App.findIndex((app)=>app.patient==patient)].status).to.be.equal("Rejected");
    });
    it("The length of list  remains same", () => {
      oldLength = App.length;
      testController.updateAppByPatientId(App, patient,status);
      chai.expect(App.length).to.be.equal(oldLength);
    });
  });
});
