
import { translate } from '../helpers/i18n'

export default function Actions (props) {
  if (props.actions) {
    return <div className="actions">
      {props.actions.map(action => <div className="button" onClick={action.onPress}>
        {translate(action.label)}
      </div>)}
    </div>
  }


  const valid = props.choice.valid()
  const currentAction = props.choice.label

  return <div className="actions">
    {props.choice.donnable ? <div className={`${valid ? '' : 'disabled'} button`} onClick={() => props.handleEvent({ type: 'done' })}>
      {translate(`${currentAction}_action`)}
    </div> : ''}
    {props.choice.allowSkip ? <div className="skip button" onClick={() => props.handleEvent({ type: 'skip' })}>
      {translate('skip')}
    </div> : ''}
  </div>
}