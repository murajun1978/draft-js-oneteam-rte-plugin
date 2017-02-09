// @flow

import type DraftHandleValue from 'draft-js/lib/DraftHandleValue';

import handleReturnWithCommand from './handleReturnWithCommand';
import handleReturnListItem from './handleReturnListItem';
import handleReturnToInsertWebCard from './handleReturnToInsertWebCard';
import handleReturnToSplitBlockIfCursorAtStart from './handleReturnToSplitBlockIfCursorAtStart';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const createHandleReturn = (config: Config): Function => (
  (event: SyntheticKeyboardEvent, pluginFunctions: PluginFunctions): DraftHandleValue => {
    const editorState = pluginFunctions.getEditorState();

    if (handleReturnWithCommand(event, config)) {
      return 'handled';
    }

    if (handleReturnListItem(editorState, config, pluginFunctions)) {
      return 'handled';
    }

    if (handleReturnToInsertWebCard(editorState, config, pluginFunctions)) {
      return 'handled';
    }

    if (handleReturnToSplitBlockIfCursorAtStart(editorState, config, pluginFunctions)) {
      return 'handled';
    }

    return 'not-handled';
  }
);

export default createHandleReturn;
