import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TabNavigationButton from './TabNavigationButton'

class TabNavigation extends React.Component {
  state = {
    tabClickEvents: {}
  }

  constructor (props) {
    super(props)
    this.state.tabClickEvents = this._getTabClickEvents(props.tabs)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tabs !== this.props.tabs) {
      this.setState({ tabClickEvents: this._getTabClickEvents(nextProps.tabs) })
    }
  }

  _getTabClickEvents (tabs) {
    return tabs.reduce((events, tab) => {
      events[tab.identifier] = this.onTabClick.bind(this, tab.identifier)
      return events
    }, {})
  }

  onTabClick (identifier) {
    this.props.onTabSelected(identifier)
  }

  render () {
    const tabButtons = this.props.tabs.map((tab) => {
      const isSelected = this.props.selectedTab === tab.identifier
      const image = `icons/${tab.icon}.svg`
      return (
        <TabNavigationButton key={tab.identifier} isSelected={isSelected}
          onClick={this.state.tabClickEvents[tab.identifier]}>
          <img src={image} alt={tab.title} />
        </TabNavigationButton>
      )
    })
    return (
      <div className={this.props.className}>
        {tabButtons}
      </div>
    )
  }
}

TabNavigation.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  onTabSelected: PropTypes.func.isRequired
}

export default styled(TabNavigation)`
  margin: 0 0 0 auto;
  background: ${props => props.theme.background.dark};
  width: 35px;
`
