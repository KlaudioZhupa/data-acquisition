import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />

            <nav>
                <ul>
                    <li>
                        <a href="/">
                            <i className="fa fa-home" aria-hidden="true"></i> Home
                        </a>
                    </li>
                    <li>
                        <a href="/mergerPage">
                            <i className="fa fa-cogs" aria-hidden="true"></i> MergerPage
                        </a>
                    </li>
                    <li>
                        <a href="/fileWriter">
                            <i className="fa fa-file" aria-hidden="true"></i> FileWriter
                        </a>
                    </li>
                    <li>
                        <a href="/mergerCharts">
                            <i className="fa fa-line-chart" aria-hidden="true"></i> MergerCharts
                        </a>
                    </li>
                    <li>
                        <a href="/fileWriterCharts">
                            <i className="fa fa-line-chart" aria-hidden="true"></i> FileWriterCharts
                        </a>
                    </li>
                    <li>
                        <a href="/messages">
                            <i className="fa fa-commenting-o" aria-hidden="true"></i> Messages
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}