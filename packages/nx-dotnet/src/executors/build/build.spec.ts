import { ExecutorContext } from '@nrwl/devkit';
import { mocked } from 'jest-mock';
import executor from './build';

import { runDotnetCommand } from '../../utils/dotnet-utils';
jest.mock('../../utils/dotnet-utils');

const mockRunDotnetCommand = mocked(runDotnetCommand);

describe('Build Executor', () => {

  beforeEach(() => {
    mockRunDotnetCommand.mockReset();
  });
  
  it('can run', async () => {
    mockRunDotnetCommand.mockReturnValue(Promise.resolve({ success: true }));

    const {success} = await executor(
      {
        csProject: 'test',
        configuration: 'Debug'
      }, 
      {} as ExecutorContext
    );
    
    expect(success).toBe(true);
    expect(mockRunDotnetCommand.mock.calls.length).toBe(1);
    expect(mockRunDotnetCommand.mock.calls[0][0]).toBe('build');
  });
});
