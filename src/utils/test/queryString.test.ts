import queryString from '../queryString'
import * as chai from 'chai'

const { expect } = chai


describe("utils/tools/queryString", () => {

  it("queryString should have props 'ArrayMode'", () => {

    expect(queryString.ArrayMode).to.be.deep.equal({
      MUL: "multiple",
      SPLIT: "split"
    })

  })

  it("queryString.stringify should return string", () => {

    expect(queryString.stringify({})).to.be.a("string")

    expect(queryString.stringify({ "user": "tester" })).to.be.a("string")

  })

  it("queryString.stringify output formatter", () => {

    expect(queryString.stringify({})).to.be.equal("")

    expect(queryString.stringify({ "user": "tester" })).to.be.equal("?user=tester")

    expect(queryString.stringify({ "user": "tester", "age": 13 })).to.be.equal("?user=tester&age=13")

    expect(queryString.stringify({ "arr": [1, 2, 3, 4] })).to.be.equal("?arr=1,2,3,4")

    expect(queryString.stringify({ "arr": [1, 2, 3, 4] }, { arrayMode: queryString.ArrayMode.SPLIT })).to.be.equal("?arr=1,2,3,4")

    expect(queryString.stringify({ "arr": [1, 2, 3, 4] }, { arrayMode: queryString.ArrayMode.MUL })).to.be.equal("?arr=1&arr=2&arr=3&arr=4")

  })


  it("queryString.parse output test", () => {

    expect(queryString.parse("")).to.be.an("object")

    expect(queryString.parse("")).to.be.deep.equal({})

    expect(queryString.parse("    ")).to.be.an("object")

    expect(queryString.parse("    ")).to.be.deep.equal({})

    expect(queryString.parse("?")).to.be.an("object")

    expect(queryString.parse("?")).to.be.deep.equal({})

    expect(queryString.parse("?username=tester&age=13")).to.be.deep.equal({ username: "tester", age: "13" })

    expect(queryString.parse("username=tester&age=13")).to.be.deep.equal({ username: "tester", age: "13" })

    expect(queryString.parse("username=one,two,three")).to.be.deep.equal({ username: ["one", "two", "three"] })

    expect(queryString.parse("username=one&username=two&username=three", { arrayMode: queryString.ArrayMode.MUL })).to.be.deep.equal({ username: ["one", "two", "three"] })
  })

})