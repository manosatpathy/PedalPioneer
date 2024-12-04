const {
  validateTagLimit,
  validateTagFormat,
} = require("../../../validation/tagValidation");
const {tag} = require("../../../models")

jest.mock("../../../models",()=>{
    tag.findAll
})


describe("test validateTagLimit function",()=>{
    const 
})