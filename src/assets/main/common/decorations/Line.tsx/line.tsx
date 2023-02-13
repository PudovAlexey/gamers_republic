type TControlProps = {
  blockHeight: string;
  color: string;
};

function Line({ blockHeight, color = '#d93644' }: TControlProps) {
  const strokeDeshOffset = 0;
  const strokeDasharray = 2000
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 970 758"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38 5C18 5 7.66667 5 5 5V510L160 689H905L965 737V758"
        stroke="#f8f8f8"
        stroke-width="10"
        style={{
          strokeDashoffset: strokeDeshOffset + 'px',
          strokeDasharray: strokeDasharray + 'px', 
          strokeLinecap: "round" 
        }}
      />
    </svg>
  );
}

export default Line;
