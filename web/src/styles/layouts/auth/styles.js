import styled from 'styled-components';
import { darken } from 'polished';
import bus from '~/assets/images/bus.jpg';

export const Wrapper = styled.div`
  height: 100%;
  height: 100vh;
  background: linear-gradient(
      234.58deg,
      rgba(112, 0, 255, 0.74) 0%,
      #6c8bf5ee 100%
    ),
    url(${bus});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    width: 100%;
    max-width: 315px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    &[type='sign-up'] {
      max-width: 500px;
    }

    input {
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      border: 0;
      border-radius: 4px;
      height: 40px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      width: 100%;
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      transition: 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
