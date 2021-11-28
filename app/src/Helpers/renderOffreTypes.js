const renderType = (param) => {
    switch(param) {
      case 'cdd':
        return 'CDD';
      case 'cdi':
        return 'CDI';
      case 'interim':
        return 'Interim';
      default:
        return '';
    }
  }

  export default renderType;