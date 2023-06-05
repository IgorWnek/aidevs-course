import { AiDevsTasksApi } from './AiDevsTasksApi';
import { aiDevsConfig } from '../../../../config/aiDevs';

const aiDevsTasksApi = new AiDevsTasksApi({ aiDevsConfig });

export { aiDevsTasksApi };
