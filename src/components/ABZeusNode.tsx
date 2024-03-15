// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ABZeusNode = ({ node, color }:{node:any,color:any}) => {
  const style = {
    backgroundColor: 'black',
    borderRadius: '50%',
    width: 12 * 2,
    height: 12 * 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12 / 2,
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={style}>
      X
    </div>
  );
};

export default ABZeusNode;

