import Conference from './Conference';
import Attendee from './Attendee';

jest.mock('./Conference');

describe('Callback Pattern Test', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Conference.mockClear();
  });
  test('1', () => {
    const conference = new Conference();
    expect(Conference).toHaveBeenCalledTimes(1);
  });
  test('2', () => {
    expect(Conference).not.toHaveBeenCalled();
  });
  test('3', () => {
    const conference = new Conference();
    conference.add(new Attendee('park', 'austin'));
    conference.add(new Attendee('kim', 'joy'));
    conference.add(new Attendee('go', 'kei'));

    expect(conference.add).toHaveBeenCalledTimes(3);
  })
  test('4', () => {
    const conference = new Conference();
    const austin = new Attendee('park', 'austin');
    const joy = new Attendee('kim', 'joy');
    const kei = new Attendee('go', 'kei');
    conference.add(austin);
    conference.add(joy);
    conference.add(kei);

    // mock.instances is available with automatic mocks:
    const mockInstance = Conference.mock.instances[0];
    const mockInstanceAdd = mockInstance.add;
    expect(mockInstanceAdd).toHaveBeenCalledTimes(3);
    expect(mockInstanceAdd).toHaveBeenCalledWith(austin);
    expect(mockInstanceAdd).toHaveBeenCalledWith(joy);
    expect(mockInstanceAdd).toHaveBeenCalledWith(kei);
  })
});
