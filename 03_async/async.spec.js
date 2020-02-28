const axios = require("axios");
const Ajax = require("./async");

jest.mock("axios");

describe("Ajax: echo", () => {
  const someData = "some data";
  it("should return value async", async () => {
    const result = await Ajax.echo(someData);
    expect(result).toBe(someData);
  });

  it("should return value with promise", () => {
    return Ajax.echo(someData).then(data => {
      expect(data).toBe(someData);
    });
  });

  it("should catch error with promise", () => {
    return Ajax.echo().catch(err => {
      expect(err).toBeInstanceOf(Error);
    });
  });

  it("should catch error with promise", async () => {
    try {
      await Ajax.echo();
    } catch (e) {
      expect(e.message).toBe("error");
    }
  });
});

describe("Ajax: GET", () => {
  let response;
  let todos;

  beforeEach(() => {
    todos = [{ id: 1, title: "Todo 1", completed: false }];

    response = {
      data: {
        todos
      }
    };
  });

  it("should return data from backend", () => {
    axios.get.mockReturnValue(response);

    return Ajax.get().then(data => {
      expect(data.todos).toEqual(todos);
    });
  });
});
