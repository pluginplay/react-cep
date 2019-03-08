import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TabNavigation from './TabNavigation'
import Flex from 'styled-flex-component'

class TabContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: this._getDefaultTab(props)
    }
    this._onTabSelectedBound = this.onTabSelected.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tabs !== this.props.tabs) {
      this.setState({ selectedTab: this._getDefaultTab(nextProps) })
    }
  }

  _getDefaultTab (props) {
    return props.tabs[0].identifier
  }

  onTabSelected (tabIdentifier) {
    this.setState({ selectedTab: tabIdentifier })
  }

  renderContent () {
    const selectedTab = this.props.tabs.filter((tab) => tab.identifier === this.state.selectedTab)[0]
    if (selectedTab) {
      const TabComponent = selectedTab.component
      return (<TabComponent />)
    }
  }

  render () {
    return (
      <Flex full className={this.props.className}>
        <div className={'content'}>
          {this.renderContent()}
        </div>
        <TabNavigation tabs={this.props.tabs} selectedTab={this.state.selectedTab}
          onTabSelected={this._onTabSelectedBound} />
      </Flex>
    )
  }
}

TabContainer.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default styled(TabContainer)`
  position: absolute;
  top: 0;
  bottom: 0;
  .content {
    margin: 0 auto 0 0;
    padding: 10px;
    width: 100%;
    overflow-y: auto;
    position: relative;
  }
  @media (max-width: 320) {
    .content { padding: 3px; }
  }
`
