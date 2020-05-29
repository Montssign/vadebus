import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .collector-profile {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 16px;
    }
  }

  h3 {
    font-size: 20px;
    text-transform: capitalize;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h4 {
    font-size: 16px;
    font-weight: normal;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > section {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 16px;
      background: none;
      border: none;
      opacity: 1;
      transition: 0.2s;

      &:hover {
        opacity: 0.7;
        transform: translateY(-3px);
      }
    }
  }

  .toggle-show-details {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    background: none;
    border: none;
    opacity: 1;
    transition: 0.2s;

    .toggle-show-icon {
      transition: 0.3s;
    }

    .toggle-show-icon-up {
      transform: rotate(180deg);
    }

    &:hover {
      opacity: 0.7;

      .toggle-show-icon {
        transform: translateY(-3px);
      }

      .toggle-show-icon-up {
        transform: translateY(-3px) rotate(180deg);
      }
    }
  }
`;

export const ModalContent = styled.section`
  margin-top: 16px;
  font-size: 20px;

  p {
    margin-bottom: 16px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 8px;
      width: 100%;
      margin: 8px;
      background: none;
      border: none;
      font-size: 16px;
      border-radius: 4px;
      color: #f8f7fd;
      font-weight: bold;

      &:nth-child(1) {
        background-color: #048ddb;
      }
      &:nth-last-child(1) {
        background-color: #ff2020;
      }
    }
  }
`;
