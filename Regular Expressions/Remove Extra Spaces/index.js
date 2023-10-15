const input = "  hello w !  my name is  kartike  singh  ";

const fixed = input.replace(/^\s+|\s+$|\s+[!\.,\;]+/g, c => c.trim()).replace(/\s\s+/g, " ");

    console.log(`"${fixed}"`)