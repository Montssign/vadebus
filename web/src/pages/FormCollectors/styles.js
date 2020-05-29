import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;

  .routes-section {
    .routes-pills {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #f8f7fd;
      height: 40px;
      border-radius: 4px;
      width: 100%;
      margin: 0 0 10px;
      padding: 0 15px;
      background-color: rgba(0, 0, 0, 0.4);

      button.routes-pills-delete {
        background: none;
        margin: 0;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        > svg {
          margin-top: 0;
          transition: 0.2s;
          opacity: 0.7;
        }

        &:hover {
          > svg {
            opacity: 1;
            margin-top: -8px;
          }
        }
      }
    }
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #f8f7fd;
  margin: 16px 0 0;
`;
