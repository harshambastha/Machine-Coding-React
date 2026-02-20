export const fileExplorerData = [
    {
        id: 1,
        name: 'README.md',
        type: 'file',
    },
    {
        id: 2,
        name: 'Documents',
        type: 'folder',
        children: [
            {
                id: 3,
                name: 'Word.doc',
                type: 'file',

            },
            {
                id: 4,
                name: 'Powerpoint.ppt',
                type: 'file',

            },
        ],
    },
    {
        id: 5,
        name: 'Downloads',
        type: 'folder',
        children: [
            {
                id: 6,
                name: 'unnamed.txt',
                type: 'file',

            },
            {
                id: 7,
                name: 'Misc',
                type: 'folder',
                children: [
                    {
                        id: 8,
                        name: 'foo.txt',
                        type: 'file',

                    },
                    {
                        id: 9,
                        name: 'bar.txt',
                        type: 'file',

                    },
                ],
            },
        ],
    },
];