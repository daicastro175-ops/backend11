let io;

export const initSocket = (socketServer) => {
    io = socketServer;
};

export const getIO = () => io;