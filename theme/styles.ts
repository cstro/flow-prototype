const styles = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  global: (props: any) => ({
    'html, body': {
      fontSize: 'sm',
      fontFamily: "'Rubik', sans-serif",
      backgroundColor:
        props.colorMode === 'dark' ? 'background.dark' : 'background.light',
      height: '100vh',
    },
  }),
}

export default styles
