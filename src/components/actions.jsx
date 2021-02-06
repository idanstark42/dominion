
import { translate } from '../helpers/i18n'

export default function Actions (props) {
  const valid = props.choice.valid()
  const currentAction = props.choice.label

  return <div className="actions">
    <div className={`${valid ? '' : 'disabled'} button`} onClick={() => props.handleEvent({ type: 'done' })}>
      {translate(`${currentAction}_action`)}
    </div>
    {props.choice.allowSkip ? <div className="skip button" onClick={() => props.handleEvent({ type: 'skip' })}>
      {translate('skip')}
    </div> : ''}
  </div>
}