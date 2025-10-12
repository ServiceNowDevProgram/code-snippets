function onLoad() {
    var field = g_form.getControl('description');
    var counter = document.createElement('div');
    counter.id = 'desc_word_counter';
    counter.style.marginTop = '5px';
    field.parentNode.appendChild(counter);

    field.addEventListener('input', function() {
        var wordCount = field.value.trim().split(/\s+/).length;
        counter.innerText = 'Word Count: ' + (field.value ? wordCount : 0);
        if (wordCount > 150) {
            counter.style.color = 'red';
        } else {
            counter.style.color = 'green';
        }
    });
}
