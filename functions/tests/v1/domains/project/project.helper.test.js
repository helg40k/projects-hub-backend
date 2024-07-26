import { describe, expect, test } from '@jest/globals';

// =============== mocks configuration ===============

// ===================================================

import getFieldContent from "../../../../api/v1/domains/project/service/helpers/getFieldContent.js";

describe('getFieldContent', () => {
  test('getFieldContent: empty name', () => {
    const result = getFieldContent();
    expect(result).toBeNull();
  });

  test('getFieldContent: empty source', () => {
    const result = getFieldContent('test_name');
    expect(result).toBeNull();
  });

  test('getFieldContent: simple case with empty field', () => {
    const source = {
      test_name: undefined
    };
    const result = getFieldContent('test_name', source);
    expect(result).toBeNull();
  });

  test('getFieldContent: simple case with string', () => {
    const source = {
      test_name: 'Any test string!'
    };
    const result = getFieldContent('test_name', source);
    expect(result).toBe('Any test string!');
  });

  test('getFieldContent: simple case with numeric', () => {
    const source = {
      test_name: 102
    };
    const result = getFieldContent('test_name', source);
    expect(result).toBe(102);
  });

  test('getFieldContent: simple case with boolean', () => {
    const source = {
      test_name: true
    };
    const result = getFieldContent('test_name', source);
    expect(result).toBeTruthy();
  });

  test('getFieldContent: simple case with object', () => {
    const source = {
      test_name: {
        test2: 'Hello!'
      }
    };
    const result = getFieldContent('test_name', source);
    expect(result).toEqual({
      test2: 'Hello!'
    });
  });

  test('getFieldContent: simple case with array 1', () => {
    const source = {
      test_name: [ 'Hello!', 1, true ]
    };
    const result = getFieldContent('test_name', source);
    expect(result).toEqual([ 'Hello!', 1, true ]);
  });

  test('getFieldContent: simple case with array 2', () => {
    const source = {
      test_name: [ 'Hello!', 1 ]
    };
    const result = getFieldContent('test_name', source);
    expect(result).toEqual([ 'Hello!', 1 ]);
  });

  test('getFieldContent: simple case with array 3', () => {
    const source = {
      test_name: [ 'Hello', 1 ]
    };
    const result = getFieldContent('test_name', source);
    expect(result).toEqual({ 'Hello': null, '1': null });
  });

  test('getFieldContent: object case 1', () => {
    const source = {
      test_name: {
        test2: 'Hello!'
      }
    };
    const result = getFieldContent('test_name.test2', source);
    expect(result).toBe('Hello!');
  });

  test('getFieldContent: object case 2', () => {
    const source = {
      test_name: {
        user: {
          id: 102,
          test2: 'Hello!'
        }
      }
    };
    const result = getFieldContent('test_name.user.test2', source);
    expect(result).toBe('Hello!');
  });

  test('getFieldContent: object case 3', () => {
    const source = {
      test_name: {
        user: {
          id: 102
        }
      }
    };
    const result = getFieldContent('test_name.user.test2', source);
    expect(result).toBeNull();
  });

  test('getFieldContent: array simple case', () => {
    const source = {
      test_name: {
        users: [
          {
            id: 102,
            test2: 'Hello!'
          },
          {
            id: 103,
            test2: 'Bye!'
          }
        ]
      }
    };
    const result = getFieldContent('test_name.users', source);
    expect(result).toEqual([
      {
        id: 102,
        test2: 'Hello!'
      },
      {
        id: 103,
        test2: 'Bye!'
      }
    ]);
  });

  test('getFieldContent: array case', () => {
    const source = {
      test_name: {
        users: [
          {
            id: 102,
            test2: 'Hello'
          },
          {
            id: 103,
            test2: 'Bye'
          }
        ]
      }
    };
    const result = getFieldContent('test_name.users.test2', source);
    expect(result).toEqual({ Hello: null, Bye: null });
  });

  test('getFieldContent: array case with inner objects 1', () => {
    const source = {
      test_name: {
        users: [
          {
            id: 102,
            test2: {
              say: 'Hello'
            }
          },
          {
            id: 103,
            test2: {
              say: 'Bye',
              something: 'more'
            }
          }
        ]
      }
    };
    const result = getFieldContent('test_name.users.test2.say', source);
    expect(result).toEqual({ Hello: null, Bye: null });
  });

  test('getFieldContent: array case with inner objects 2', () => {
    const source = {
      users: [
        {
          id: 102,
          test2: {
            say: 'Hello'
          }
        },
        {
          id: 103,
          test2: {
            say: 'Bye',
            something: 'more'
          }
        }
      ]
    };
    const result = getFieldContent('users.test2.say', source);
    expect(result).toEqual({ Hello: null, Bye: null });
  });

  test('getFieldContent: array case with inner objects 3', () => {
    const source = {
      users: [
        {
          id: 102,
          test2: {
            quant: 22
          }
        },
        {
          id: 103,
          test2: {
            quant: 23,
            something: 'more'
          }
        }
      ]
    };
    const result = getFieldContent('users.test2.quant', source);
    expect(result).toEqual({ 22: null, 23: null });
  });

  test('getFieldContent: array case with inner objects 4', () => {
    const source = {
      users: [
        {
          id: 102,
          test2: {
            say: 'Hello!'
          }
        },
        {
          id: 103,
          test2: {
            say: 'Bye',
            something: 'more'
          }
        }
      ]
    };
    const result = getFieldContent('users.test2.say', source);
    expect(result).toEqual([ 'Hello!', 'Bye' ]);
  });

  test('getFieldContent: complex array case with inner arrays', () => {
    const source = {
      test_name: {
        users: [
          {
            id: 102,
            test2: {
              users: [
                {
                  id: 104,
                  test3: 'Halt'
                },
                {
                  id: 105,
                  test3: 'Go'
                }
              ]
            }
          },
          {
            id: 103,
            test2: {
              users: [
                {
                  id: 106,
                  test3: 'Freeze'
                },
                {
                  id: 107,
                  test3: 'Pron'
                }
              ]
            }
          }
        ]
      }
    };
    const result = getFieldContent('test_name.users.test2.users.test3', source);
    expect(result).toEqual([ { Halt: null, Go: null }, { Freeze: null, Pron: null } ]);
  });

  test('getFieldContent: empty array case', () => {
    const source = {
      test_name: {
        users: []
      }
    };
    const result = getFieldContent('test_name.users.test2.say', source);
    expect(result).toEqual([]);
  });

  test('getFieldContent: empty object case', () => {
    const source = {
      test_name: {
        user: null
      }
    };
    const result = getFieldContent('test_name.user.test2.say', source);
    expect(result).toBeNull();
  });
});
