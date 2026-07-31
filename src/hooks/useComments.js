
import { useState, useMemo } from 'react';

const initialComments = [
    {
        id: '1',
        author: 'John Doe',
        email: 'john@example.com',
        content: 'This is a really insightful post! Thanks for sharing.',
        postTitle: 'Mastering React and Vite',
        status: 'approved', // 'approved', 'pending', 'spam'
        date: '2026-07-30 14:25',
    },
    {
        id: '2',
        author: 'Spam Bot',
        email: 'bot@spam.com',
        content: 'Buy cheap crypto now at shady-link.com',
        postTitle: 'Top 10 CSS Tips',
        status: 'spam',
        date: '2026-07-31 09:10',
    },
    {
        id: '3',
        author: 'Jane Smith',
        email: 'jane@example.com',
        content: 'Can you write a follow-up article on this topic?',
        postTitle: 'Mastering React and Vite',
        status: 'pending',
        date: '2026-07-31 11:00',
    },
];

export function useComments() {
    const [comments, setComments] = useState(initialComments);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'approved', 'pending', 'spam'
    
    // Reply modal state
    const [replyModalOpened, setReplyModalOpened] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [replyText, setReplyText] = useState('');

    // Filter comments based on search query and status
    const filteredComments = useMemo(() => {
        return comments.filter((comment) => {
            const matchesSearch = 
                comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [comments, searchQuery, statusFilter]);

    // Handle Approve
    const handleApprove = (id) => {
        setComments(prev => 
            prev.map(c => c.id === id ? { ...c, status: 'approved' } : c)
        );
    };

    // Handle Spam
    const handleMarkAsSpam = (id) => {
        setComments(prev => 
            prev.map(c => c.id === id ? { ...c, status: 'spam' } : c)
        );
    };

    // Handle Delete
    const handleDelete = (id) => {
        setComments(prev => prev.filter(c => c.id !== id));
    };

    // Handle Reply Open
    const openReplyModal = (comment) => {
        setSelectedComment(comment);
        setReplyText('');
        setReplyModalOpened(true);
    };

    const closeReplyModal = () => {
        setReplyModalOpened(false);
        setSelectedComment(null);
        setReplyText('');
    };

    const handleSendReply = () => {
        if (!replyText.trim()) return;
        // এখানে চাইলে রিপ্লাই সাবমিট বা API কল হ্যান্ডেল করা যাবে
        closeReplyModal();
    };

    return {
        comments: filteredComments,
        totalCount: comments.length,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        handleApprove,
        handleMarkAsSpam,
        handleDelete,
        replyModalOpened,
        selectedComment,
        replyText,
        setReplyText,
        openReplyModal,
        closeReplyModal,
        handleSendReply,
    };
}