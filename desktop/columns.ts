import fs from 'fs';
import { Dispatch, RPCHandler } from '../desktop/rpc';
import { getProjectResultsFile } from '../desktop/store';
import { PanelBody } from '../shared/rpc';

export const fetchResultsHandler: RPCHandler<PanelBody, { value: any }> = {
  resource: 'fetchResults',
  handler: async function (
    projectId: string,
    body: PanelBody,
    dispatch: Dispatch
  ): Promise<{ value: any }> {
    // Maybe the only appropriate place to call this in this package?
    const projectResultsFile = getProjectResultsFile(projectId);
    const f = fs.readFileSync(projectResultsFile + body.panelId);

    // Everything gets stored as JSON on disk. Even literals and files get rewritten as JSON.
    return { value: JSON.parse(f.toString()) };
  },
};