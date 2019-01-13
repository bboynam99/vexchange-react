import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedNumber } from 'react-intl';
import _ from 'lodash';

import Container from '../../components/Container';

const Wrapper = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #dadee6;
`;

const Links = styled.div`
  padding: 8px 0;

  @media all and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Link = styled.a`
  color: rgba(0, 0, 0, 0.65);

  span {
    text-transform: uppercase;
  }

  &:first-of-type {
    margin-right: 24px;
  }

  }
`;

const Label = styled.span`
`;

class Balances extends Component {
  static format = num => num / 1000000000000000000;

  static getPrice = (num, price) => {
    const format = Balances.format(num);
    return format * price;
  }

  constructor() {
    super();

    this.state = {
      tickers: {},
      balances: {},
    };
  }

  componentDidMount() {
    this.props.onLoad();
  }

  componentWillReceiveProps({ tickers, balances }) {
    if (!_.isEmpty(tickers)) {
      this.setState({ tickers });
    }

    if (!_.isEmpty(balances)) {
      this.setState({ balances });
    }
  }

  render() {
    const { tickers, balances } = this.state;

    return (
      <Wrapper>
        <Container>
          <Links>
            <Link href="https://explore.veforge.com/accounts/0xc63e4E69Aa1A8d28fa50bE30A4cB330712b9d93f" target="_blank">
              <Label>VET Balance: </Label>
              <FormattedNumber value={Balances.format(balances.vet)} />
              {' '}
              (<FormattedNumber
                value={Balances.getPrice(balances.vet, tickers.vet)}
                currency="USD" style="currency" />)
            </Link>

            <Link href="https://explore.veforge.com/accounts/0xc63e4E69Aa1A8d28fa50bE30A4cB330712b9d93f" target="_blank">
              <Label>VTHO Balance: </Label>
              <FormattedNumber value={Balances.format(balances.vtho)} />
              {' '}
              (<FormattedNumber
                value={Balances.getPrice(balances.vtho, tickers.vtho)}
                currency="USD" style="currency" />)
            </Link>
          </Links>
        </Container>
      </Wrapper>
    );
  }
}

export default Balances;
