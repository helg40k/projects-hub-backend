/* global jest, beforeEach, describe, test, fail, expect */

// =============== mocks configuration ===============

const mockValidate = jest.fn();

beforeEach(() => {
  mockValidate.mockClear();
});

// ===================================================

const validate = require('../../../api/v1/utils/validate');

describe('validate', () => {
  test('validate success', () => {
    const schema = {
      validate: mockValidate
    };
    const testObj = {
      test: true
    };

    mockValidate.mockReturnValue({
      value: {
        test: true
      }
    });

    const result = validate(schema, testObj, false);
    expect(result).toEqual(testObj);

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(testObj, {
      abortEarly: true,
      allowUnknown: false,
      stripUnknown: false
    });
  });

  test('validate success: default', () => {
    const schema = {
      validate: mockValidate
    };
    const testObj = {
      test: true
    };

    mockValidate.mockReturnValue({
      value: {
        test: true
      }
    });

    const result = validate(schema, testObj);
    expect(result).toEqual(testObj);

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(testObj, {
      abortEarly: true,
      allowUnknown: true,
      stripUnknown: false
    });
  });

  test('validate failed: validation', () => {
    const schema = {
      validate: mockValidate
    };
    const testObj = {
      test: true
    };

    mockValidate.mockReturnValue({
      error: Error('Test error!')
    });

    try {
      validate(schema, testObj);
      fail('Error is expected');
    } catch (e) {
      expect(e.message).toBe('Error: Test error!');
    }

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(testObj, {
      abortEarly: true,
      allowUnknown: true,
      stripUnknown: false
    });
  });

  test('validate failed: empty value (unlikely case!)', () => {
    const schema = {
      validate: mockValidate
    };
    const testObj = {
      test: true
    };

    mockValidate.mockReturnValue({});

    try {
      validate(schema, testObj);
      fail('Error is expected');
    } catch (e) {
      expect(e.message).toBe('Empty validating results!');
    }

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(testObj, {
      abortEarly: true,
      allowUnknown: true,
      stripUnknown: false
    });
  });

  test('validate failed: empty object', () => {
    const schema = {
      validate: mockValidate
    };

    try {
      validate(schema);
      fail('Error is expected');
    } catch (e) {
      expect(e.message).toBe('Tested object may not be empty!');
    }

    expect(mockValidate).toHaveBeenCalledTimes(0);
  });

  test('validate failed: empty schema', () => {
    const testObj = {
      test: true
    };

    try {
      validate(null, testObj);
      fail('Error is expected');
    } catch (e) {
      expect(e.message).toBe('Testing schema may not be empty!');
    }

    expect(mockValidate).toHaveBeenCalledTimes(0);
  });
});
