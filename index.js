document.addEventListener("DOMContentLoaded", () => {
    loadComments();
});

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(commentData => {
        const comment = createCommentElement(commentData);
        document.getElementById('comments-container').appendChild(comment);
    });
}

function saveComments() {
    const commentsContainer = document.getElementById('comments-container');
    const comments = Array.from(commentsContainer.children).map(commentElement => {
        return getCommentData(commentElement);
    });
    localStorage.setItem('comments', JSON.stringify(comments));
}

function getCommentData(commentElement) {
    const commentText = commentElement.querySelector('p').textContent;
    const repliesContainer = commentElement.querySelector('.reply-container');
    const replies = repliesContainer ? Array.from(repliesContainer.children).map(replyElement => getCommentData(replyElement)) : [];
    return { text: commentText, replies: replies };
}

function addComment() {
    const commentText = document.getElementById('new-comment').value;
    if (commentText.trim() !== "") {
        const comment = createCommentElement({ text: commentText, replies: [] });
        document.getElementById('comments-container').appendChild(comment);
        document.getElementById('new-comment').value = "";
        saveComments();
    }
}

function createCommentElement(commentData) {
    const comment = document.createElement('div');
    comment.classList.add('comment');

    const commentText = document.createElement('p');
    commentText.textContent = commentData.text;
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
            const reply = createCommentElement({ text: replyTextValue, replies: [] });
            const replyContainer = comment.querySelector('.reply-container') || document.createElement('div');
            replyContainer.classList.add('reply-container');
            replyContainer.appendChild(reply);
            comment.appendChild(replyContainer);
            replyText.value = "";
            replyForm.style.display = 'none';
            saveComments();
        }
    };
    replyForm.appendChild(submitReplyButton);
    comment.appendChild(replyForm);

    if (commentData.replies && commentData.replies.length > 0) {
        const replyContainer = document.createElement('div');
        replyContainer.classList.add('reply-container');
        commentData.replies.forEach(replyData => {
            const reply = createCommentElement(replyData);
            replyContainer.appendChild(reply);
        });
        comment.appendChild(replyContainer);
    }

    return comment;
}
