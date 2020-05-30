import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import SidePanel from '../components/Sidebar/SidePanel';
import SideBar from '../components/Sidebar/SideBar';
import {
    Chat as ChatObject,
    ChatChannel,
    ChatlogStruct,
    ChatType,
    MoreSettingsStruct,
    TalkClient
} from 'node-kakao/dist';
import {PacketSyncMessageReq, PacketSyncMessageRes} from 'node-kakao/dist/packet/packet-sync-message';
import ChatRoom from '../components/Chat/ChatRoom/ChatRoom';
import {Long} from "bson";
import EmptyChatRoom from '../components/Chat/ChatRoom/EmptyChatRoom';

const Wrapper = styled.div`
width: 100%;
height: 100vh;
box-sizing: border-box;
display: flex;
flex-direction: row;
padding-top: ${(() => {
    switch ((nw as any).process.platform) {
        case 'darwin':
        case 'cygwin':
        case 'win32':
            return 20;
        default:
            return 0;
    }
})()}px;
`;

const talkClient: TalkClient = (nw as any).global.talkClient;

const makeTemplate = (nw as any).global.makeTemplate;

let records: boolean[] = [];

const Chat = () => {
    const [channelList, setChannelList] = useState<ChatChannel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState(-1);
    const [accountSettings, setAccountSettings] = useState<MoreSettingsStruct>();
    const [chatList, setChatList] = useState<ChatObject[]>([]);
    const [inputText, setInputText] = useState('');

    const messageHook = (chat: ChatObject) => {
        setChatList((prev) => [...prev, chat]);
    }

    useEffect(() => {
        channelList.forEach(async (channel, index) => {
            if (index !== selectedChannel) return;
            if (records[index]) return;

            let lastTokenId = (await talkClient.LocoInterface.requestPacketRes<PacketSyncMessageRes>(new PacketSyncMessageReq(channel.Id, Long.fromString("1"), 1, Long.fromString("2")))).LastTokenId;
            let firstMessage = (await talkClient.LocoInterface.requestPacketRes<PacketSyncMessageRes>(new PacketSyncMessageReq(channel.Id, Long.fromString("1"), 1, lastTokenId)));
            let update: ChatObject[] = [];
            if (firstMessage.ChatList.length) {
                let start_id = (firstMessage.ChatList.shift() as ChatlogStruct).prevLogId, chatLog: ChatObject[] = [];
                do {
                    chatLog = await talkClient.ChatManager.getChatListFrom(channel.Id, start_id);
                    update.push(...chatLog);

                    if (chatLog.length > 0) {
                        start_id = chatLog[chatLog.length - 1].LogId;
                    }
                } while (chatLog.length > 0);
                setChatList((prev) => [...prev, ...update]);
            }
            records[index] = true;
        });
    }, [selectedChannel]);

    useEffect(() => {
        setChannelList(talkClient.ChannelManager.getChannelList());
        talkClient.ApiClient.requestMoreSettings()
            .then((result: MoreSettingsStruct) => {
                setAccountSettings(result);
            })
            .catch((error: any) => {
                alert("오류가 발생했습니다.\n" + error);
            });

        talkClient.on('message', messageHook);
    }, [])
    // //console.log(chatList)
    // //console.log(selectedChannel)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const channel = channelList[selectedChannel];
        if (!channel?.Id) return;
        if (inputText.length <= 0) return;

        if (inputText[0] === '/') {
            const cmd = inputText.split(/\s/g);
            switch (cmd[0]) {
                case '/photo':
                    makeTemplate(ChatType.Photo, cmd[1])
                        .then((template: any) => {
                            channel.sendTemplate(template)
                                .then(result => {
                                    setInputText('');

                                    messageHook(result);
                                })
                                .catch((error: any) => {
                                    alert(`메시지 발송 중 오류 발생 ${error}`);
                                });
                        })
                    break;
                case '/video':
                    makeTemplate(ChatType.Video, cmd[1])
                        .then((template: any) => {
                            channel.sendTemplate(template)
                                .then(result => {
                                    setInputText('');

                                    messageHook(result);
                                })
                                .catch((error: any) => {
                                    alert(`메시지 발송 중 오류 발생 ${error}`);
                                });
                        })
                    break;
                case '/file':
                    makeTemplate(ChatType.File, cmd[1])
                        .then((template: any) => {
                            channel.sendTemplate(template)
                                .then(result => {
                                    setInputText('');

                                    messageHook(result);
                                })
                                .catch((error: any) => {
                                    alert(`메시지 발송 중 오류 발생 ${error}`);
                                });
                        })
                    break;
            }
        } else {
            channel.sendText(inputText)
                .then(result => {
                    setInputText('');

                    messageHook(result);
                })
                .catch((error: any) => {
                    alert(`메시지 발송 중 오류 발생 ${error}`);
                });
        }
    }

    return (
        <Wrapper>
            <SideBar />
            <SidePanel
                channelList={channelList}
                accountSettings={accountSettings}
                onChange={(selectedChannel) => setSelectedChannel(selectedChannel)} />
            {
                channelList[selectedChannel]
                    ? <ChatRoom
                        channel={channelList[selectedChannel]}
                        chatList={chatList.filter((chat) => chat.Channel.Id.toString() === channelList[selectedChannel].Id.toString())}
                        onInputChange={onChange}
                        onSubmit={onSubmit} inputValue={inputText} />
                    : <EmptyChatRoom />
            }
        </Wrapper>
    );
};

export default Chat;
