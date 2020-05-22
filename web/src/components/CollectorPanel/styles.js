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
  }

  h4 {
    font-size: 16px;
    font-weight: normal;
  }

  .options-buttons {
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
