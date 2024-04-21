import React, { useState } from 'react';
import { Chat, Message } from '@progress/kendo-react-conversational-ui';

interface Messag {
  id: number;
  text: string;
}

const MyChat: React.FC = () => {
  const [senderMsg, setSenderMsg] = useState<Message[]>([{ id: 1, text: 'Hello, how can I help you?' }]);
  const [receiverMsg, setReceiverMsg] = useState<Message[]>([]);

  const addNewSenderMessage = (text: string) => {
    const newMessage: Messag = { id: senderMsg.length + 1, text };
    setSenderMsg([...senderMsg, newMessage]);
  };

  const addNewReceiverMessage = (text: string) => {
    const newMessage: Messag = { id: receiverMsg.length + 1, text };
    setReceiverMsg([...receiverMsg, newMessage]);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Chat UI Example</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sender</h5>
              {senderMsg.map((msg) => (
                <div key={msg.id} className="card-text text-end">
                  <Message author={{ id: 1, name: 'Sender' }} text={msg.text} />
                </div>
              ))}
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  aria-label="Type your message..."
                  aria-describedby="button-send"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addNewSenderMessage(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-send"
                  onClick={(e) => {
                    const input = document.querySelector<HTMLInputElement>('.form-control');
                    if (input) {
                      addNewSenderMessage(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Receiver</h5>
              {receiverMsg.map((msg) => (
                <div key={msg.id} className="card-text">
                  <Message author={{ id: 2, name: 'Receiver' }} text={msg.text} />
                </div>
              ))}
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  aria-label="Type your message..."
                  aria-describedby="button-send"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addNewReceiverMessage(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-send"
                  onClick={(e) => {
                    const input = document.querySelector<HTMLInputElement>('.form-control');
                    if (input) {
                      addNewReceiverMessage(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChat;
