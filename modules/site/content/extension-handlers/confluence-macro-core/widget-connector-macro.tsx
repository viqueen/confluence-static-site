/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';

type WidgetConnectorMacroProps = {
    url: string;
};

const SPOTIFY_TRACK =
    /^https:\/\/open\.spotify\.com\/track\/(?<trackId>[a-zA-Z0-9]+)(\?.*)?$/;
const YOUTUBE_VIDEO = /^https:\/\/www\.youtube\.com\/watch\?v=(?<videoId>\w+)$/;

const SpotifyEmbed = (props: { trackId?: string }) => {
    const { trackId } = props;
    if (!trackId) return <></>;
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
    return (
        <div style={{ textAlign: 'center' }}>
            <iframe
                style={{ borderRadius: 12, border: 'none' }}
                src={embedUrl}
                width="50%"
                height="380"
                title={trackId}
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
        </div>
    );
};

const YoutubeEmbed = (props: { videoId?: string }) => {
    const { videoId } = props;
    if (!videoId) return <></>;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return (
        <div style={{ textAlign: 'center' }}>
            <iframe
                width="560"
                height="315"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
            />
        </div>
    );
};

export const WidgetConnectorMacro = ({ url }: WidgetConnectorMacroProps) => {
    const spotify = url.match(SPOTIFY_TRACK);
    if (spotify) return <SpotifyEmbed trackId={spotify.groups?.trackId} />;

    const youtube = url.match(YOUTUBE_VIDEO);
    if (youtube) return <YoutubeEmbed videoId={youtube.groups?.videoId} />;

    return <></>;
};
