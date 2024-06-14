function addComment() {
    const commentText = document.getElementById('new-comment').value;
    if (commentText.trim() !== "") {
        const comment = createCommentElement(commentText);
        document.getElementById('comments-container').appendChild(comment);
        document.getElementById('new-comment').value = "";
    }
}

function createCommentElement(text) {
    const comment = document.createElement('div');
    comment.classList.add('comment');

    const commentText = document.createElement('p');
    commentText.textContent = text;
    comment.appendChild(commentText);

    const replyButton = document.createElement('span');
    replyButton.textContent = 'Add a reply';
    replyButton.classList.add('reply-button');
    replyButton.onclick = function() {
        const replyForm = this.nextElementSibling;
        if (replyForm.style.display === 'none' || replyForm.style.display === '') {
            replyForm.style.display = 'block';
        } else {
            replyForm.style.display = 'none';
        }
    };
    comment.appendChild(replyButton);

    const replyForm = document.createElement('div');
    replyForm.classList.add('reply-form');

    const replyText = document.createElement('textarea');
    replyText.placeholder = "Add a reply";
    replyForm.appendChild(replyText);

    const submitReplyButton = document.createElement('button');
    submitReplyButton.textContent = 'Submit';
    submitReplyButton.onclick = function() {
        const replyTextValue = replyText.value;
        if (replyTextValue.trim() !== "") {
            const reply = createCommentElement(replyTextValue);
            const replyContainer = document.createElement('div');
            replyContainer.classList.add('reply-container');
            replyContainer.appendChild(reply);
            comment.appendChild(replyContainer);
            replyText.value = "";
            replyForm.style.display = 'none';
        }
    };
    replyForm.appendChild(submitReplyButton);
    comment.appendChild(replyForm);

    return comment;
}
